import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const PIPEDRIVE_PIPELINE_ID = 3;
const PIPEDRIVE_STAGE_ID = 54; // "Calculs ROI"

interface ROIPDFRequest {
  email: string;
  pdfBase64: string;
  calculatorData: {
    // Inputs
    nbOperateurs: number;
    pourcentageTemps: number;
    photosAnnuelles: number;
    tailleProduitsCategory: string;
    typesContenu: string[];
    leasingActif: boolean;
    leasingMensualite?: number;
    leasingNbMois?: number;
    // Machine
    machineNom: string;
    machineId: string;
    // Résultats
    economieAnnuelle: number;
    roi5ans: number;
    breakEvenMois: number | null;
    economie5ans: number;
    isRentable: boolean;
    isLeasing: boolean;
    coutTotalActuel: number;
    coutTotalMachine: number;
  };
  locale: 'fr' | 'en';
}

async function createPipedrivePerson(email: string, apiToken: string): Promise<number | null> {
  try {
    // Check if person already exists
    const searchRes = await fetch(
      `https://api.pipedrive.com/v1/persons/search?term=${encodeURIComponent(email)}&fields=email&limit=1&api_token=${apiToken}`
    );
    const searchData = await searchRes.json();

    if (searchData.data?.items?.length > 0) {
      return searchData.data.items[0].item.id;
    }

    // Create new person
    const res = await fetch(
      `https://api.pipedrive.com/v1/persons?api_token=${apiToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: email.split('@')[0],
          email: [{ value: email, primary: true, label: 'work' }],
        }),
      }
    );
    const data = await res.json();
    return data.data?.id || null;
  } catch (error) {
    console.error('Pipedrive person creation error:', error);
    return null;
  }
}

async function createPipedriveDeal(
  personId: number,
  calculatorData: ROIPDFRequest['calculatorData'],
  email: string,
  apiToken: string
): Promise<number | null> {
  try {
    const mode = calculatorData.isLeasing ? 'Leasing' : 'Achat';
    const title = `ROI Calculator - ${calculatorData.machineNom} - ${email}`;

    const noteLines = [
      `📊 Résultats Calculateur ROI`,
      ``,
      `👤 Contact : ${email}`,
      `📅 Date : ${new Date().toLocaleDateString('fr-FR')}`,
      ``,
      `--- INPUTS ---`,
      `Opérateurs : ${calculatorData.nbOperateurs}`,
      `Temps photo : ${calculatorData.pourcentageTemps}%`,
      `Photos/an : ${calculatorData.photosAnnuelles.toLocaleString('fr-FR')}`,
      `Taille produits : ${calculatorData.tailleProduitsCategory}`,
      `Types contenu : ${calculatorData.typesContenu.join(', ')}`,
      `Mode : ${mode}`,
    ];

    if (calculatorData.isLeasing && calculatorData.leasingMensualite) {
      noteLines.push(`Mensualité leasing : ${calculatorData.leasingMensualite}€/mois`);
      noteLines.push(`Durée leasing : ${calculatorData.leasingNbMois} mois`);
    }

    noteLines.push(
      ``,
      `--- MACHINE RECOMMANDÉE ---`,
      `${calculatorData.machineNom}`,
      ``,
      `--- RÉSULTATS ROI ---`,
      `Rentable : ${calculatorData.isRentable ? 'Oui' : 'Non'}`,
      `Économie annuelle : ${calculatorData.economieAnnuelle.toLocaleString('fr-FR')}€`,
      `ROI 5 ans : ${calculatorData.roi5ans.toLocaleString('fr-FR')}%`,
      `Économie sur 5 ans : ${calculatorData.economie5ans.toLocaleString('fr-FR')}€`,
      `Break-even : ${calculatorData.breakEvenMois ? `${calculatorData.breakEvenMois} mois` : 'N/A'}`,
      `Coût actuel/an : ${calculatorData.coutTotalActuel.toLocaleString('fr-FR')}€`,
      `Coût machine/an : ${calculatorData.coutTotalMachine.toLocaleString('fr-FR')}€`
    );

    const res = await fetch(
      `https://api.pipedrive.com/v1/deals?api_token=${apiToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          person_id: personId,
          pipeline_id: PIPEDRIVE_PIPELINE_ID,
          stage_id: PIPEDRIVE_STAGE_ID,
        }),
      }
    );
    const data = await res.json();
    const dealId = data.data?.id;

    if (dealId) {
      // Add note with all calculator data
      await fetch(
        `https://api.pipedrive.com/v1/notes?api_token=${apiToken}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deal_id: dealId,
            content: noteLines.join('\n'),
            pinned_to_deal_flag: true,
          }),
        }
      );
    }

    return dealId;
  } catch (error) {
    console.error('Pipedrive deal creation error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;

    const body: ROIPDFRequest = await request.json();
    const { email, pdfBase64, calculatorData, locale } = body;

    if (!email || !pdfBase64) {
      return NextResponse.json(
        { error: 'Email and PDF are required' },
        { status: 400 }
      );
    }

    // 1. Send email with PDF via Resend
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const fileName = `ROI-Analysis-${calculatorData.machineNom.replace(/\s+/g, '-')}.pdf`;

    const subject = locale === 'fr'
      ? `Votre analyse ROI PackshotCreator - ${calculatorData.machineNom}`
      : `Your PackshotCreator ROI Analysis - ${calculatorData.machineNom}`;

    const htmlContent = locale === 'fr'
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #7C6BF0; padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">PackshotCreator</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Votre analyse ROI personnalisée</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
            <p>Bonjour,</p>
            <p>Vous trouverez en pièce jointe votre analyse ROI complète pour le studio <strong>${calculatorData.machineNom}</strong>.</p>
            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Résumé</h3>
              <p>💰 Économie annuelle estimée : <strong>${calculatorData.economieAnnuelle.toLocaleString('fr-FR')}€</strong></p>
              <p>📈 ROI sur 5 ans : <strong>${calculatorData.roi5ans.toLocaleString('fr-FR')}%</strong></p>
              ${calculatorData.breakEvenMois ? `<p>⏱ Retour sur investissement en <strong>${calculatorData.breakEvenMois} mois</strong></p>` : ''}
            </div>
            <p>Pour aller plus loin, notre équipe se tient à votre disposition pour une démonstration personnalisée.</p>
            <a href="https://www.packshot-creator.com/fr/contact" style="display: inline-block; background: #7C6BF0; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 10px;">Demander une démo</a>
            <p style="margin-top: 30px; color: #666; font-size: 12px;">PackshotCreator by Sysnext — www.packshot-creator.com</p>
          </div>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #7C6BF0; padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">PackshotCreator</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Your personalized ROI analysis</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
            <p>Hello,</p>
            <p>Please find attached your complete ROI analysis for the <strong>${calculatorData.machineNom}</strong> studio.</p>
            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Summary</h3>
              <p>💰 Estimated annual savings: <strong>€${calculatorData.economieAnnuelle.toLocaleString('en-US')}</strong></p>
              <p>📈 5-year ROI: <strong>${calculatorData.roi5ans.toLocaleString('en-US')}%</strong></p>
              ${calculatorData.breakEvenMois ? `<p>⏱ Break-even in <strong>${calculatorData.breakEvenMois} months</strong></p>` : ''}
            </div>
            <p>To take the next step, our team is available for a personalized demonstration.</p>
            <a href="https://www.packshot-creator.com/en/contact" style="display: inline-block; background: #7C6BF0; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 10px;">Request a demo</a>
            <p style="margin-top: 30px; color: #666; font-size: 12px;">PackshotCreator by Sysnext — www.packshot-creator.com</p>
          </div>
        </div>
      `;

    const emailResult = await resend.emails.send({
      from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject,
      html: htmlContent,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer,
        },
      ],
    });

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email', details: emailResult.error.message },
        { status: 500 }
      );
    }

    // 2. Create Pipedrive contact + deal
    let pipedriveResult = { personId: null as number | null, dealId: null as number | null };

    if (PIPEDRIVE_API_TOKEN) {
      const personId = await createPipedrivePerson(email, PIPEDRIVE_API_TOKEN);
      if (personId) {
        const dealId = await createPipedriveDeal(personId, calculatorData, email, PIPEDRIVE_API_TOKEN);
        pipedriveResult = { personId, dealId };
      }
    }

    return NextResponse.json({
      success: true,
      emailId: emailResult.data?.id,
      pipedrive: pipedriveResult,
    });
  } catch (error) {
    console.error('ROI PDF API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

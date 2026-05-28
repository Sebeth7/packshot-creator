import Script from 'next/script';

const LEMLIST_TRACKING_SRC =
  'https://app.lemlist.com/api/visitors/tracking?k=3S6eLaZEjVRDPlI76L%2B3eMSC8UqHxUaGi29PAqmVtn4OSCvCplqjnnsu8AnfSpQ%2F&t=tea_AzFjTpZSorfSBmNJA';

export default function LemlistTracker() {
  return (
    <Script
      id="lemlist-tracker"
      src={LEMLIST_TRACKING_SRC}
      strategy="afterInteractive"
    />
  );
}

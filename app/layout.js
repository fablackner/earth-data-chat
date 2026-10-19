import './globals.css';

export const metadata = {
  title: 'earth-data-chat',
  description: 'Ask about earthquakes, weather, volcanoes, space weather and other live Earth data.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

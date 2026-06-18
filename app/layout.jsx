import '../styles/globals.css';

export const metadata = {
  title: 'XAI Learning Hub',
  description: 'Learn explainable AI with interactive topics and flashcards',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}

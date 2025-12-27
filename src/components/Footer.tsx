export function Footer() {
  return (
    <footer className="border-t border-border mt-12 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          Made with <span className="text-red-500">♥</span> by Automatica (
          <a 
            href="https://t.me/aiwizards" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @aiwizards
          </a>
          )
        </p>
      </div>
    </footer>
  );
}

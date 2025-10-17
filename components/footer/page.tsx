export default function Footer(){
    return(
        <footer className="w-full bg-zinc-900 text-[var(--foreground)] py-6">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} EECS 4413. All rights reserved.</p>
            </div>
        </footer>
    );
}
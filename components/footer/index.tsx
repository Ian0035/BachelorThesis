export default function Footer() {    
    return (

    <footer className="bg-gray-100 border-t-green-500 border-2 w-full shadow-sm dark:bg-zinc-800 bottom-0 left-0">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src="/images\ChatGPT Image 6 apr 2025, 16_34_08.png" className="h-24" alt="CFA Companion Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CFA Companion</span>
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">CFA Companion™</a>. All Rights Reserved.</span>
        </div>
    </footer>
    )
}

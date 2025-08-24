import React from 'react';

export default function YazilimBlankPage({ content = "SUCH A BLANK PAGE", emoji }: { content?: string, emoji?: string }) {
    return (
        <div className="h-screen w-full bg-gradient-to-br relative">
            {/* Animated background elements */}
            <div className="fixed inset-0 pointer-events-none z-10">
                <div className="absolute top-[10%] left-[10%] text-4xl font-bold text-orange-500 opacity-10 animate-pulse">
                    {'{/}'}
                </div>
                <div className="absolute top-[20%] right-[15%] text-4xl font-bold text-orange-500 opacity-10 animate-bounce">
                    {'{/}'}
                </div>
                <div className="absolute bottom-[30%] left-[20%] text-4xl font-bold text-orange-500 opacity-10 animate-pulse delay-1000">
                    {'{/}'}
                </div>
                <div className="absolute top-[40%] left-[15%] text-4xl font-bold text-orange-500 opacity-10 animate-bounce">
                    {'{/}'}
                </div>
                <div className="absolute bottom-[20%] right-[10%] text-4xl font-bold text-orange-500 opacity-10 animate-bounce delay-2000">
                    {'{/}'}
                </div>
            </div>

            <div className="relative z-20 flex flex-col min-h-screen">
                {/* Header */}
                <header className="p-8 text-center">
                    <div className="text-6xl md:text-7xl font-bold text-orange-500 mb-4 animate-pulse drop-shadow-lg">
                        {'{/}'}
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center md:space-x-2 space-y-2 md:space-y-0">
                        <h1 className="mt-16 text-3xl md:text-4xl font-light tracking-wider bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent leading-relaxed pb-1">
                            {content}
                        </h1>
                        <h1 className="sm:mt-16 text-3xl md:text-4xl font-light tracking-wider">
                            {emoji}
                        </h1>
                    </div>
                    {/* <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide"> */}
                    {/*     İzmir Yüksek Teknoloji Enstitüsü */}
                    {/* </p> */}
                </header>

                {/* Main content */}
                {/* <main className="flex-1 flex items-center justify-center p-8"> */}
                {/*     <div className="max-w-4xl w-full text-center p-12 border-2 border-dashed border-orange-500/30 rounded-3xl bg-white/5 backdrop-blur-sm relative overflow-hidden group"> */}
                {/*         {/* Glowing border effect */}
                {/*         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-3000 ease-in-out"></div> */}
                {/**/}
                {/*         <div className="relative z-10"> */}
                {/*             <p className="text-2xl md:text-3xl text-gray-400 mb-8 font-light"> */}
                {/*                 Bu alan içeriğiniz için hazır */}
                {/*             </p> */}
                {/*             <p className="text-base md:text-lg text-orange-500 font-medium tracking-widest uppercase"> */}
                {/*                 Yakında Daha Fazlası... */}
                {/*             </p> */}
                {/*         </div> */}
                {/*     </div> */}
                {/* </main> */}

                {/* Footer */}
                {/* <footer className="p-8 text-center bg-black/50 border-t border-orange-500/20"> */}
                {/*     <p className="text-gray-500 text-sm"> */}
                {/*         © 2025 IYTE YAZILIM SOCIETY. Tüm hakları saklıdır. */}
                {/*     </p> */}
                {/* </footer> */}
            </div>

            {/* Additional floating elements for more dynamic feel */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-orange-500/20 rounded-full animate-ping"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-orange-500/30 rounded-full animate-ping delay-1000"></div>
            </div>
        </div>
    );
};

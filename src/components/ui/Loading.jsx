export default function Loading() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-[#2E8FE0]/5">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2E8FE0] border-t-transparent"></div>
                <p className="text-[#2E8FE0] font-medium">Carregando...</p>
            </div>
        </div>
    );
}
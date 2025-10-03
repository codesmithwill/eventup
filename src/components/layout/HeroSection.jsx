export default function HeroSection() {
  return (
    <div className="hidden lg:flex bg-gradient-to-t from-slate-50 via-[#88bbe4] min-w-1/2 text-3xl">
      <div className='flex flex-col justify-center m-8 gap-4'>
        <h1>Encontros que criam <span className='text-[#2E8FE0] font-bold'>memórias</span>.</h1>
        <h1>Eventos que aproximam <span className='text-[#2E8FE0] font-bold'>pessoas</span>.</h1>
        <h1 className='font-bold'>Dê um <span className='text-[#2E8FE0] font-bold'>up</span> na sua vida.</h1>
        <h1 className='font-bold'>Dê um <span className='text-[#2E8FE0] font-bold'>up</span> na EventUp.</h1>
      </div>
    </div>
  );
}
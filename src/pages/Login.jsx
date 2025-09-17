import { useState } from 'react';
import logo from '../imgs/logo_nbg.png'
import Footer from '../components/Footer';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="flex h-lvh w-dvw min-h-screen">
            <div className="hidden lg:flex bg-gradient-to-t from-slate-50 via-[#88bbe4] min-w-1/2 text-3xl">

            <div className='flex flex-col justify-center m-8 gap-4'>
                <h1>Encontros que criam <span className='text-[#2E8FE0] font-bold'>memórias</span>.</h1>
                <h1>Eventos que aproximam <span className='text-[#2E8FE0] font-bold'>pessoas</span>.</h1>
                <h1 className='font-bold'>Dê um <span className='text-[#2E8FE0] font-bold'>up</span> na sua vida.</h1>
                <h1 className='font-bold'>Dê um <span className='text-[#2E8FE0] font-bold'>up</span> na EventUp.</h1>
            </div>

            </div>

            <div className="flex flex-col justify-center items-center bg-gradient-to-t from-slate-50 via-[#88bbe4] to-slate-50 w-dvw gap-20 lg:bg-none lg:bg-white">
                <img src={logo} alt="Logo EventUp" width={250} height={250}/>


                <div className='flex justify-center'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
                        <div>
                            <label htmlFor="email"></label>
                            <input
                            className='border border-[#2E8FE0] w-100 rounded-4xl p-2 placeholder-black focus:outline-none'
                            type="email"
                            id="email"
                            value={email}
                            placeholder='Nome de Usuário ou E-mail'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label htmlFor="password"></label>
                            <input
                            className='border border-[#2E8FE0] w-100 rounded-4xl p-2 placeholder-black focus:outline-none'
                            type="password"
                            id="password"
                            value={password}
                            placeholder='Senha'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </div>

                        <div className='flex justify-around italic'>
                            <a className='hover:font-bold' href="">
                                <p className=''>Esqueceu sua Senha?</p>
                            </a>

                            <a className='hover:font-bold' href="">
                                <p>Cadastrar-se</p>
                            </a>

                        </div>

                        <div className='flex justify-center'>
                            <button 
                                type="submit"
                                className='border border-[#2E8FE0] bg-[#2e90e0] text-white p-3 font-bold text-2xl rounded-4xl w-3xs cursor-pointer hover:bg-[#2e90e09c]'
                                >Entrar</button>
                        </div>
                    </form>
                </div>
                
            <Footer/>

            </div>

        </div>
    )
}
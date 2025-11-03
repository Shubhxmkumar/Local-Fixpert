import bg from '../assets/home-page/hero-bg.png';
import heroimg from '../assets/home-page/hero-man.png';
const Hero = () => { 
    return(
        // style={{backgroundImage:`url(${bg})`}}
        <div className=" min-h-dvh poppins-regular ">
            <img className='absolute -top-5 -z-10 rotate-1 ' src={bg} alt=""  />
            <div className="relative top-15 flex mx-auto w-full px-15 my-15 max-w-[90%]">
                <div className="flex flex-col gap-5 mx-5 ">
                    <div className="bg-blue-100 py-2 px-5 rounded-full w-fit">Trusted By Locals</div>
                    <div className="max-w-2/3 flex flex-col gap-4">
                        <h1 className="text-6xl ">Hire the best local experts today</h1>
                        <p className='text-md' >From electricians to cleaners, we connect you with the right expert quickly and hassle-free.</p>
                    </div>
                    <div className="bg-blue-500 py-2.5 px-10 rounded-full w-fit text-white">Get an Expert</div>

                </div>
                <div className="hero-img  ">
                    <img className="h-" src={heroimg} alt="" />
                </div>
            </div>
        </div>
    )
 }
 export default Hero;
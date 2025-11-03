// import bg from '../assets/home-page/hero-bg.png';
// import heroimg from '../assets/home-page/hero-man.png';
// const Hero = () => { 
//     return(
//         // style={{backgroundImage:`url(${bg})`}}
//         <div className=" min-h-dvh  ">
//             <img className='absolute -top-5 inset-0 -z-10 rotate-3 ' src={bg} alt=""  />
//             <div className=" flex mx-auto w-full px-15 my-15 max-w-[90%]">
//                 <div className="flex flex-col gap-5 mx-5">
//                     <div className="bg-blue-100 py-2 px-5 rounded-full w-fit">Trusted By Locals</div>
//                     <div className="max-w-2/3 flex flex-col gap-4">
//                         <h1 className="text-6xl wrap-break-word">Hire the best local experts today</h1>
//                         <p className='text-md' >From electricians to cleaners, we connect you with the right expert quickly and hassle-free.</p>
//                     </div>
//                     <div className="bg-blue-500 py-2.5 px-10 rounded-full w-fit text-white">Get an Expert</div>

//                 </div>
//                 <div className="hero-img max-h-1/2 ">
//                     <img className='' src={heroimg} alt="" />
//                 </div>
//             </div>
//         </div>
//     )
//  }
//  export default Hero;
import bg from '../assets/home-page/hero-bg.png';
import heroimg from '../assets/home-page/hero-man.png';

const Hero = () => { 
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* Background Image */}
      <img 
        className="absolute inset-0 -z-10 w-full h-full object-cover rotate-3" 
        src={bg} 
        alt="Background"  
      />

      {/* Gradient on left 30% only */}
      <div className="absolute inset-0 w-[30%] md:w-[35%] -z-10"></div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-[90%] mx-auto px-5 md:px-15 py-10 md:py-20 gap-10">
        
        {/* Left Text Section */}
        <div className="flex flex-col gap-5 text-center md:text-left md:w-1/2">
          <div className="bg-blue-100 py-2 px-5 rounded-full w-fit mx-auto md:mx-0">
            Trusted By Locals
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Hire the best local experts today
            </h1>
            <p className="text-sm sm:text-base md:text-lg">
              From electricians to cleaners, we connect you with the right expert quickly and hassle-free.
            </p>
          </div>

          <div className="bg-blue-500 py-2.5 px-10 rounded-full w-fit text-white mx-auto md:mx-0 cursor-pointer hover:scale-105 transition">
            Get an Expert
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hero-img w-full md:w-1/2 flex justify-center md:justify-end">
          <img 
            className="max-w-[80%] sm:max-w-[70%] md:max-w-full h-auto object-contain" 
            src={heroimg} 
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

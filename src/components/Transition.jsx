import Image from "./Image";

function Transition({ img1, img2 }) {
    return (
        <div className='transition rtl'>
            <Image src={img1} alt='img1' />
            <Image src={img2} alt='img2' />
            <div className='border'      />
        </div>
    );
}

export default Transition;
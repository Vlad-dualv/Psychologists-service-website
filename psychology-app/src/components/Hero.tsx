import { MoveUpRight, Check, UsersRound } from 'lucide-react';
import { MdOutlineQuestionMark } from "react-icons/md";
import Link from 'next/link';
import Image from 'next/image';
import heroImg from '@/images/hero-image.png';

export default function Hero() {

    return (
        <section className='py-10 md:py-[78px]'>
            <div className='max-w-[1280px] w-full px-4 md:px-6 mx-auto'>
                <div>
                    <h1>The road to the <span>depths</span> of the human soul</h1>
                <p>
        We help you to reveal your potential, overcome challenges and find a
        guide in your own life with the help of our experienced psychologists.
                </p>
                <button type="button">
                    <Link href="/psychologists">Get Started <MoveUpRight /></Link>
                </button>
                </div>
                <div>
                    <MdOutlineQuestionMark />
                    <UsersRound />
                    <div>
                        <Check />
                        <p>Experienced psychologists</p>
                        <h2>15,000</h2>
                    </div>
                    <div>
                        <Image src={heroImg} alt="Hero Image" width={464} height={526} />
                    </div>
                </div>
            </div>
            
        </section>
    )
}
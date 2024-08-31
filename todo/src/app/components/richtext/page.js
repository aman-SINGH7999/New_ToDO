
import Image from "next/image";
import bold from './../../../../public/bold.png'
import itelic from './../../../../public/itelic.png'
import underline from './../../../../public/underline.png'
import centerLine from './../../../../public/center-line.png'
import fullLine from './../../../../public/full-line.png'
import rightLine from './../../../../public/right-line.png'
import bullet from './../../../../public/bullet.png'
import number from './../../../../public/number.png'
import textColor from './../../../../public/text-color.png'
import textSize from './../../../../public/text-size.png'

export default function Richtext() {
    return (
        <>
        <div>
            <Image src={bold}  className="icon selected"/>
            <Image src={itelic} className="icon"/>
            <Image src={underline} className="icon"/>
            <Image src={centerLine} className="icon"/>
            <Image src={rightLine} className="icon"/>
            <Image src={fullLine} className="icon "/>
            <Image src={bullet} className="icon"/>
            <Image src={number} className="icon"/>
            <Image src={textColor} className="icon"/>
            <Image src={textSize} className="icon "/>
          </div>
        </>
    )
}
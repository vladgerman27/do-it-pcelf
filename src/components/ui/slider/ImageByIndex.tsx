import image1 from '../../../../public/img/pc.png'
import image2 from '../../../../public/img/pc.png'
import image3 from '../../../../public/img/pc.png'
import image4 from '../../../../public/img/pc.png'

export const images: string[] = [image1.src, image2.src, image3.src, image4.src]

const imageByIndex = (index: number): string => images[index % images.length]

export default imageByIndex

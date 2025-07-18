import Image from 'next/image';

const firstList = [
  "Shop Home Collection",
  "Gift Cards",
  "Wynn Stories",
  "Wynn Slots App",
  "Mobile App",
  "Responsible Gaming",
]

const secondList = [
  "About Us",
  "Careers",
  "Investor Relations",
  "Privacy Notice",
  "Cookie Notice",
  "Terms of Use",
  "Hotel Information & Directory"
]

const thirdList = [
  "Wynn Palace Cotai",
  "Encore Boston Harbor",
  "Wynn Macau",
]

const fourthList = [
  "Wynn and Encore Las Vegas",
  "3131 Las Vegas Blvd. Las Vegas, NV 89109",
  "+1 (702) 770-7000",
]

export const Footer = () => {
  return (
    <footer className="w-full bg-white">
      {/* Top footer */}
      <div className='flex justify-between items-center max-w-desktop my-0 mx-auto px-[70px] py-5'>
        <h4 className="font-caslo text-xl">Get News & Updates</h4>

        <p>Get latest developments and exciting news on <br /> how we are shaping the future!</p>

        <div className="border-2 border-background px-5 py-3 flex justify-around">
          <input placeholder="Your email address" type="text" className="outline-none w-[330px]" id="email-news" name="email-news" />
          <button className="btn-secondary">
            JOIN THE NEWSLETTER
          </button>
        </div>
      </div>

      {/* Bottom footer */}
      <div className='w-full bg-primary'>
        <div className="max-w-desktop my-0 mx-auto px-[160px] py-10 text-background font-semibold">
          <div className='flex justify-between mb-[60px]'>
            <List items={firstList} />
            <List items={secondList} />
            <List items={thirdList} />
            <div>
              <List items={fourthList} />

              <p className='text-xs mt-5 mb-3'>Connect with us.</p>
              <div className='flex items-center gap-8'>
                <a href="www.google.com">
                  <Image src="/icons/facebook.svg" alt="fb" width={27} height={27} />
                </a>
                <a href="www.google.com">
                  <Image src="/icons/android.svg" alt="fb" width={27} height={27} />
                </a>
                <a href="www.google.com">
                  <Image src="/icons/apple.svg" alt="fb" width={27} height={27} />
                </a>
                <a href="www.google.com">
                  <Image src="/icons/ig.svg" alt="fb" width={27} height={27} />
                </a>
                <a href="www.google.com">
                  <Image src="/icons/x.svg" alt="fb" width={27} height={27} />
                </a>
              </div>
            </div>
          </div>
          <div className='max-w-desktop my-0 mx-auto flex flex-col justify-center items-center text-background text-xs gap-2.5'>
            <p>Do Not Sell Or Share My Data</p>
            <p>© 2024 Wynn Resorts Holdings, LLC. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const List = ({ items }: { items: string[] }) => {
  return (
    <ul>
      {
        items.map((item) => (
          <li key={item} className="mb-3 text-xs">{item}</li>
        ))
      }
    </ul>
  )
}

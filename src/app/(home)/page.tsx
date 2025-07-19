import Image from "next/image"

import { Logout } from "./ui/Logout";

export default function HomePage() {


  return (
    <div>
      <picture>
        {/* <source media="(min-width: 1200px)" srcSet="large-image.jpg" />
        <source media="(min-width: 768px)" srcset="medium-image.jpg" /> */}
        <Image
          src="https://cdn.wynnresorts.com/image/upload/w_auto,f_auto,q_auto,dpr_auto/c_crop,w_5120,h_2052,x_0,y_395/f_auto/q_auto/v1733426360/Wynn%20Al%20Marjan/Wynn_Al_Marjan_Island-Aerial_View-Marina_Estates"
          alt="wynn island"
          width={5120}
          height={3067}
        />
      </picture>
      <div className="max-w-7xl my-10 mx-auto">
        <div className="flex flex-col w-full pb-3 text-center justify-center">
          <h2 className="text-3xl text-[#000] font-medium">Welcome to Wynn Al Marjan Island</h2>
        </div>

        <p className="text-lg text-center">
          On schedule to open early 2027, Wynn Al Marjan Island has been created as an opulent and entertaining beachside destination for discerning guests to play and relax. The resort is located less than 50 minutes from Dubai International Airport and is currently under construction on a picturesque island totaling more than 60 hectares that gracefully curve into the beautiful Arabian Gulf.
        </p>

        <div className="text-center my-10">
          <Logout />
        </div>
      </div>
    </div>
  );
}
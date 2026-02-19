import imagesData from "../../data/images-data.js";

export default function Info() {
  const imagesArr = imagesData.map((img) => {
    return (
      <img
        key={img.id}
        className="min-w-full w-full min-h-full h-full rounded-lg object-cover border border-[#EEB1D5]"
        src={img.source}
        alt="A photo of well manucured hands"
      />
    );
  })

  return (
    <header>
      <div className="flex gap-4 p-2 overflow-x-auto">
      {imagesArr}
      </div>
      <p className="mt-5 mb-0 text-center text-[25px] font-bold text-[#EEB1D5]">
        Yohlie Nails
      </p>
      <p className="mt-0 mb-5 text-center text-[12.8px] font-normal text-[#85756E]">
        French Manucure at home
      </p>
      <nav className="flex justify-evenly text-[#1C0F13]">
        <button className="btn global-hover">
            <i className="fa-solid fa-envelope"></i>
            Email
        </button>

        <button className="btn global-hover">
            <i className="fa-brands fa-instagram"></i>
            Instagram
        </button>
      </nav>
    </header>
  );
}

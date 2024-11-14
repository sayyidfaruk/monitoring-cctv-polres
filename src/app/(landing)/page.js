'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Home() {
  const videoRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
      videoRef.current.currentTime = 0;
    }
  }, [pathname]);
  return (
    <div className="max-w-screen-2xl mx-auto w-full">
      <video
        ref={videoRef}
        className="w-full bg-gray-800 p-2 rounded-md"
        width="auto"
        height="auto"
        autoPlay
        controls
        loop
      >
        <source src="/vidioProfile.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-full flex flex-col gap-4">
        <div className="bg-gray-800 p-4 my-3 rounded-md">
          <h2 className="text-center text-white font-bold text-3xl my-3">
            SEKSI TEKNOLOGI INFORMASI KOMUNIKASI
          </h2>
          <div className="text-white bg-gray-900 p-3 rounded-md">
            <h3 className="mb-2">PASAL 25</h3>

            <p className="leading-relaxed lg:text-lg">
              (1) Seksi teknologi informasi komunikasi sebagaimana dimaksud dalam pasal 6 ayat (3)
              huruf I, bertugas melaksanakan pelayanan teknologi informasi dan komunikasi,
              pengumpulan dan pengolahan data, serta penyajian informasi masyarakat, keamanan dan
              ketertiban.
            </p>

            <p className="leading-relaxed lg:text-lg">
              (2) Dalam melaksanakan tugas sebagaimana dimaksud pada ayat (1), seksi teknologi
              informasi komunikasi menyelenggarakan fungsi:
            </p>
            <ul className="leading-relaxed lg:text-lg">
              <li>a. jaringan komunikasi kepolisian dan data, serta pelayanan telekomunikasi;</li>
              <li>
                b. pelayanan sistem informasi keamanan dan ketertiban masyarakat, meliputi penyajian
                data operasional dan pembinaan;
              </li>
              <li>
                c. penyelenggaraan koordinasi dalam penggunaan teknologi informasi dan komunikasi
                dengan satuan fungsi di lingkungan polres.
              </li>
            </ul>
          </div>
          <div className="w-full text-white mt-3 bg-gray-900 p-3 rounded-md">
            <h3 className="mb-2">PASAL 26</h3>
            <p className="leading-relaxed lg:text-lg">
              (1) Seksi teknologi informasi komunikasi sebagaimana dimaksud dalam pasal 25, terdiri
              atas:
            </p>
            <ul className="leading-relaxed lg:text-lg">
              <li>a. subseksi teknologi komunikasi;</li>
              <li>b. subseksi teknologi informasi; dan</li>
              <li>c. urusan administrasi.</li>
            </ul>

            <p className="leading-relaxed lg:text-lg">
              (2) Subseksi teknologi komunikasi sebagaimana dimaksud pada ayat (1) huruf a, bertugas
              melaksanakan pemeliharaan jaringan komunikasi polisi dan data, serta pelayanan
              telekomunikasi.
            </p>

            <p className="leading-relaxed lg:text-lg">
              (3) Subseksi teknologi informasi sebagaimana dimaksud pada ayat (1) huruf b, bertugas
              menyelenggarakan sistem informasi keamanan dan ketertiban masyarakat meliputi
              pengumpulan dan pengolahan data polres serta sistem informasi kriminal.
            </p>

            <p className="leading-relaxed lg:text-lg">
              (4) Urusan administrasi sebagaimana dimaksud pada ayat (1) huruf c, bertugas
              menyelenggarakan kegiatan administrasi pegawai negeri pada polri dan logistik serta
              administrasi umum.
            </p>
          </div>
        </div>

        <div className="w-full">
          <Image
            width={600}
            height={600}
            src="/Gambar WhatsApp 2024-09-20 pukul 12.29.41_c4e26293.jpg"
            alt="tik polres"
            className="w-[80%] m-auto"
          />
        </div>
        <div className="w-full">
          <Image
            width={600}
            height={600}
            src="/Gambar WhatsApp 2024-09-26 pukul 12.51.12_6f9d0675.jpg"
            alt="tik polres"
            className="w-[80%] m-auto"
          />
        </div>
      </div>
    </div>
  );
}

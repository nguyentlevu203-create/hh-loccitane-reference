interface MembershipCard {
  title: string;
  description: string;
  image: string;
  href: string;
  ctaLabel: string;
}

const perks: MembershipCard[] = [
  {
    title: "VOUCHER 10% & MIỄN PHÍ VẬN CHUYỂN",
    description: "Ưu đãi dành riêng thành viên của L'Occitane",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/membership-voucher.jpg",
    href: "#",
    ctaLabel: "Đăng ký ngay ›",
  },
  {
    title: "MUA HÀNG VÀ TÍCH ĐIỂM",
    description:
      "Trở thành thành viên L'Occitane để nhận ưu đãi mua hàng và tích điểm dành riêng website",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/membership-points.jpg",
    href: "#",
    ctaLabel: "Khám phá ngay ›",
  },
  {
    title: "ƯU ĐÃI ĐỘC QUYỀN",
    description: "Ưu đãi độc quyền dành riêng khách hàng tại kênh website",
    image:
      "/sites/vn-loccitane-com-1c965340/root-8a5edab2/images/membership-exclusive.jpg",
    href: "#",
    ctaLabel: "Khám phá ngay ›",
  },
];

export function RefillsBanner() {
  return (
    <section className="relative mt-[30px] min-h-[300px] w-full overflow-hidden md:aspect-[16/9] md:min-h-[500px]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/sites/vn-loccitane-com-1c965340/root-8a5edab2/videos/refills.mp4"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative flex h-full min-h-[300px] w-full items-center justify-center px-4 text-center md:min-h-[500px]">
        <div>
          <h2 className="text-3xl font-medium uppercase tracking-[0.05em] text-white md:text-5xl">
            Refills Reimagined
          </h2>
          <a
            href="#"
            className="mt-4 inline-block text-sm text-white underline-offset-4 hover:underline"
          >
            Khám phá ngay
          </a>
        </div>
      </div>
    </section>
  );
}

export function MembershipPerks() {
  return (
    <section className="pt-[30px]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-medium">ĐẶC QUYỀN CHO THÀNH VIÊN</h2>
          <span className="mx-auto mt-2 block h-px w-10 bg-foreground" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {perks.map((perk) => (
            <div key={perk.title} className="flex flex-col">
              <img
                src={perk.image}
                alt={perk.title}
                className="aspect-[4/3] w-full rounded-sm object-cover"
              />
              <div className="px-4 py-4 text-left">
                <h3 className="text-base font-bold uppercase">
                  {perk.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {perk.description}
                </p>
                <a
                  href={perk.href}
                  className="mt-3 inline-block text-sm hover:underline"
                >
                  {perk.ctaLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

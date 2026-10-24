
function Footer() {
  return (
    <footer className="mt-20 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Company */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              G-TECH ENGINEERING SERVICES PTE. LTD.
            </h2>

            <p className="leading-7 text-gray-300">
              Delivering professional engineering installation,
              maintenance and project management solutions across
              Singapore.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Services
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>Engineering Installation</li>
              <li>Maintenance</li>
              <li>Project Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Contact
            </h3>

            <p className="text-gray-300">
              📧 chandran@gtechengineering.com
            </p>

            <p className="mt-2 text-gray-300">
              📞 +65 9860 9641
            </p>

            <p className="mt-4 text-gray-300">
              #01-04
              <br />
              180 Woodlands Industrial Park E5
              <br />
              Singapore 757512
            </p>
          </div>
        </div>

        <hr className="my-10 border-slate-700" />

        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} G-TECH ENGINEERING SERVICES PTE. LTD.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

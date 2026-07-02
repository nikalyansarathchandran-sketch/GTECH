function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Company */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              G-TECH Engineering
            </h2>

            <p className="text-gray-300 leading-7">
              Delivering professional engineering installation,
              maintenance and project management solutions across
              Singapore.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
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
            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <p className="text-gray-300">
              📧 chandran@gtechengineering.com
            </p>

            <p className="text-gray-300 mt-2">
              📞 +65 9860 9641
            </p>

            <p className="text-gray-300 mt-4">
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
          © {new Date().getFullYear()} G-TECH Engineering.
          All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
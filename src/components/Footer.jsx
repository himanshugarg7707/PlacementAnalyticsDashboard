import { collegeInfo } from '../data/placementData';

export default function Footer() {
  return (
    <footer className="footer-minimal" role="contentinfo">
      <div className="footer-inner-clean">
        <div className="footer-left">
          <div className="footer-brand-title">NIT Kurukshetra • Placement Portal</div>
          <p className="footer-sub">
            Training &amp; Placement Cell, National Institute of Technology, Kurukshetra, Haryana, India.
          </p>
        </div>
        <div className="footer-right">
          <span className="footer-tag">Batch {collegeInfo.session}</span>
          <span className="footer-tag">187+ Recruiters</span>
          <span className="footer-tag">₹{collegeInfo.highestPackage} LPA Max CTC</span>
        </div>
      </div>
      <div className="footer-copy-clean">
        © {new Date().getFullYear()} National Institute of Technology, Kurukshetra. Verified institutional placement records.
      </div>
    </footer>
  );
}

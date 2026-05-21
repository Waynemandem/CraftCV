// src/components/forms/CertsForm.jsx
import Input          from '../ui/Input'
import Button         from '../ui/Button'
import useResumeStore from '../../store/resumeStore'

export default function CertsForm() {
  const { certs, addCert, updateCert, removeCert } = useResumeStore()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#1A1A22]">Certifications</h2>
          <p className="text-sm text-[#7A7893] mt-0.5">Courses, licences, and certificates.</p>
        </div>
        <Button variant="outline" size="sm" onClick={addCert}>+ Add</Button>
      </div>

      {certs.length === 0 && (
        <div className="border border-dashed border-[#E4E2EE] rounded-lg p-8 text-center">
          <p className="text-sm text-[#7A7893]">No certifications added yet.</p>
          <button onClick={addCert} className="text-sm text-[#3D2B6B] font-medium mt-2 hover:underline">
            + Add a certification
          </button>
        </div>
      )}

      {certs.map((cert, i) => (
        <div key={cert.id} className="border border-[#E4E2EE] rounded-lg p-5 bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-[#7A7893] uppercase tracking-wider">
              Cert {i + 1}
            </span>
            <button onClick={() => removeCert(cert.id)} className="text-xs text-red-400 hover:text-red-600">
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Certification Name" placeholder="AWS Solutions Architect"
              value={cert.name}
              onChange={(e) => updateCert(cert.id, { name: e.target.value })}
            />
            <Input
              label="Issuing Organisation" placeholder="Amazon Web Services"
              value={cert.issuer}
              onChange={(e) => updateCert(cert.id, { issuer: e.target.value })}
            />
            <Input
              label="Year" placeholder="2024"
              value={cert.year}
              onChange={(e) => updateCert(cert.id, { year: e.target.value })}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
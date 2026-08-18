// src/components/resume/pdf/MinimalPDF.jsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#1A1A22',
  },
  header: {
    borderBottom: '1 solid #E4E2EE',
    paddingBottom: 10,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  title: {
    fontSize: 11,
    color: '#3D2B6B',
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 8,
  },
  contactItem: {
    fontSize: 8,
    color: '#7A7893',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#3D2B6B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1 solid #E4E2EE',
    paddingBottom: 3,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#2C2C36',
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1A1A22',
  },
  entrySubtitle: {
    fontSize: 9,
    color: '#3D2B6B',
  },
  entryDate: {
    fontSize: 8,
    color: '#7A7893',
  },
  bullet: {
    fontSize: 9,
    color: '#2C2C36',
    marginBottom: 2,
    marginLeft: 8,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillBadge: {
    fontSize: 8,
    backgroundColor: '#EDE8F7',
    color: '#3D2B6B',
    padding: '3 8',
    borderRadius: 3,
  },
})

export default function MinimalPDF({ personal, summary, experience, education, skills, projects, certs }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personal?.name || 'Your Name'}</Text>
          {personal?.title && <Text style={styles.title}>{personal.title}</Text>}
          <View style={styles.contactRow}>
            {personal?.email && <Text style={styles.contactItem}>{personal.email}</Text>}
            {personal?.phone && <Text style={styles.contactItem}>{personal.phone}</Text>}
            {personal?.location && <Text style={styles.contactItem}>{personal.location}</Text>}
          </View>
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.bodyText}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{exp.role}</Text>
                  <Text style={styles.entryDate}>{exp.from} — {exp.to}</Text>
                </View>
                <Text style={styles.entrySubtitle}>{exp.company}</Text>
                {exp.bullets?.map((b, j) => (
                  <Text key={j} style={styles.bullet}>• {b}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{edu.school}</Text>
                  <Text style={styles.entryDate}>{edu.year}</Text>
                </View>
                <Text style={styles.entrySubtitle}>{edu.degree} {edu.field ? `— ${edu.field}` : ''}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsRow}>
              {skills.map((s, i) => (
                <Text key={i} style={styles.skillBadge}>{s}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.entryTitle}>{p.name}</Text>
                <Text style={styles.bodyText}>{p.desc}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certs?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certs.map((c, i) => (
              <View key={i} style={styles.entryRow}>
                <Text style={styles.entryTitle}>{c.name}</Text>
                <Text style={styles.entryDate}>{c.year}</Text>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  )
}
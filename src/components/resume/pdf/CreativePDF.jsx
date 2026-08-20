// src/components/resume/pdf/CreativePDF.jsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#3D2B6B',
    padding: '24 32',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  title: {
    fontSize: 10,
    color: '#C4B8E8',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 6,
  },
  contactPill: {
    fontSize: 7,
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#E4E2EE',
    padding: '3 8',
    borderRadius: 8,
  },
  body: {
    padding: '20 32',
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#3D2B6B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
    borderBottom: '1 solid #E4E2EE',
    paddingBottom: 3,
  },
  section: {
    marginBottom: 14,
  },
  bodyText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#2C2C36',
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1A1A22',
  },
  entrySubtitle: {
    fontSize: 9,
    color: '#5B3FA6',
    marginBottom: 3,
  },
  entryDatePill: {
    fontSize: 7,
    backgroundColor: '#3D2B6B',
    color: '#fff',
    padding: '2 6',
    borderRadius: 6,
  },
  bullet: {
    fontSize: 8.5,
    color: '#2C2C36',
    marginBottom: 2,
    marginLeft: 6,
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
    borderRadius: 4,
  },
})

export default function CreativePDF({ personal, summary, experience, education, skills, projects, certs }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header block */}
        <View style={styles.header}>
          <Text style={styles.name}>{personal?.name || 'Your Name'}</Text>
          {personal?.title && <Text style={styles.title}>{personal.title}</Text>}
          <View style={styles.contactRow}>
            {personal?.email && <Text style={styles.contactPill}>{personal.email}</Text>}
            {personal?.location && <Text style={styles.contactPill}>{personal.location}</Text>}
            {personal?.linkedin && <Text style={styles.contactPill}>{personal.linkedin}</Text>}
          </View>
        </View>

        <View style={styles.body}>

          {summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text style={styles.bodyText}>{summary}</Text>
            </View>
          )}

          {experience?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp, i) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <View style={styles.entryRow}>
                    <Text style={styles.entryTitle}>{exp.role}</Text>
                    <Text style={styles.entryDatePill}>{exp.from} - {exp.to}</Text>
                  </View>
                  <Text style={styles.entrySubtitle}>{exp.company}</Text>
                  {exp.bullets?.map((b, j) => (
                    <Text key={j} style={styles.bullet}>◆ {b}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

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

          {education?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <View style={styles.entryRow}>
                    <Text style={styles.entryTitle}>{edu.school}</Text>
                    <Text style={styles.entryDatePill}>{edu.year}</Text>
                  </View>
                  <Text style={styles.entrySubtitle}>{edu.degree}</Text>
                </View>
              ))}
            </View>
          )}

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

        </View>

      </Page>
    </Document>
  )
}
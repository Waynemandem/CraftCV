// src/components/resume/pdf/CorporatePDF.jsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#2C2C36',
    padding: 20,
    color: '#fff',
  },
  main: {
    width: '65%',
    padding: 24,
  },
  sidebarName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  sidebarTitle: {
    fontSize: 9,
    color: '#C4B8E8',
    marginBottom: 14,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#9B8DC0',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1 solid #3D2B6B',
    paddingBottom: 3,
    marginBottom: 6,
    marginTop: 14,
  },
  sidebarText: {
    fontSize: 8,
    color: '#E4E2EE',
    marginBottom: 3,
  },
  skillDot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#7C5CBF',
    marginRight: 4,
  },
  mainSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#3D2B6B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '2 solid #3D2B6B',
    paddingBottom: 3,
    marginBottom: 8,
    marginTop: 4,
  },
  bodyText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#2C2C36',
    marginBottom: 10,
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
    marginBottom: 3,
  },
  entryDate: {
    fontSize: 8,
    color: '#7A7893',
  },
  bullet: {
    fontSize: 8.5,
    color: '#2C2C36',
    marginBottom: 2,
    marginLeft: 6,
  },
})

export default function CorporatePDF({ personal, summary, experience, education, skills, projects, certs }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarName}>{personal?.name || 'Your Name'}</Text>
          {personal?.title && <Text style={styles.sidebarTitle}>{personal.title}</Text>}

          <Text style={styles.sidebarSectionTitle}>Contact</Text>
          {personal?.email && <Text style={styles.sidebarText}>{personal.email}</Text>}
          {personal?.phone && <Text style={styles.sidebarText}>{personal.phone}</Text>}
          {personal?.location && <Text style={styles.sidebarText}>{personal.location}</Text>}

          {skills?.length > 0 && (
            <>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              {skills.map((s, i) => (
                <View key={i} style={styles.skillDot}>
                  <View style={styles.dot} />
                  <Text style={styles.sidebarText}>{s}</Text>
                </View>
              ))}
            </>
          )}

          {education?.length > 0 && (
            <>
              <Text style={styles.sidebarSectionTitle}>Education</Text>
              {education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={[styles.sidebarText, { fontWeight: 'bold', color: '#fff' }]}>{edu.school}</Text>
                  <Text style={styles.sidebarText}>{edu.degree}</Text>
                  <Text style={styles.sidebarText}>{edu.year}</Text>
                </View>
              ))}
            </>
          )}
        </View>

        {/* Main */}
        <View style={styles.main}>
          {summary && (
            <>
              <Text style={styles.mainSectionTitle}>Profile</Text>
              <Text style={styles.bodyText}>{summary}</Text>
            </>
          )}

          {experience?.length > 0 && (
            <>
              <Text style={styles.mainSectionTitle}>Experience</Text>
              {experience.map((exp, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <View style={styles.entryRow}>
                    <Text style={styles.entryTitle}>{exp.role}</Text>
                    <Text style={styles.entryDate}>{exp.from} — {exp.to}</Text>
                  </View>
                  <Text style={styles.entrySubtitle}>{exp.company}</Text>
                  {exp.bullets?.map((b, j) => (
                    <Text key={j} style={styles.bullet}>▸ {b}</Text>
                  ))}
                </View>
              ))}
            </>
          )}

          {projects?.length > 0 && (
            <>
              <Text style={styles.mainSectionTitle}>Projects</Text>
              {projects.map((p, i) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={styles.entryTitle}>{p.name}</Text>
                  <Text style={styles.bodyText}>{p.desc}</Text>
                </View>
              ))}
            </>
          )}

          {certs?.length > 0 && (
            <>
              <Text style={styles.mainSectionTitle}>Certifications</Text>
              {certs.map((c, i) => (
                <View key={i} style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{c.name}</Text>
                  <Text style={styles.entryDate}>{c.year}</Text>
                </View>
              ))}
            </>
          )}
        </View>

      </Page>
    </Document>
  )
}
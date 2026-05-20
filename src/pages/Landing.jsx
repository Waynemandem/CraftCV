import Button    from '../components/ui/Button'
import Input     from '../components/ui/Input'
import Card      from '../components/ui/Card'
import Badge     from '../components/ui/Badge'
import AIButton  from '../components/ui/AIButton'

export default function Landing() {
  return (
    <div className="p-10 flex flex-col gap-6">
      <Button>Primary Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Input label="Full Name" placeholder="John Doe" required />
      <Card>This is a card</Card>
      <Badge onRemove={() => {}}>React</Badge>
      <AIButton label="Generate Summary" />
    </div>
  )
}
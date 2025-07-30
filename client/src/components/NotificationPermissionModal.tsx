import { useState, useEffect } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function NotificationPermissionModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (Notification.permission === 'default') {
      setTimeout(() => setOpen(true), 1500) // wait 1.5s for dramatic effect lol
    }
  }, [])

  const handleAllow = async () => {
    const result = await Notification.requestPermission()
    if (result === 'granted') {
      console.log('Notifications allowed 🥳')
      new Notification('Thanks for subscribing! 🎉')
    } else {
      console.log('Notifications not allowed 😢')
    }
    setOpen(false)
  }

  const handleDeny = () => {
    console.log('User said nope 🚫')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-2xl max-w-sm mx-auto mt-10 border">
        <h2 className="text-xl font-semibold mb-3">🔔 Stay Updated!</h2>
        <p className="text-sm mb-5 text-muted-foreground">
          Please allow us to send you notifications on each appointments. 
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={handleDeny}>
            Maybe Later
          </Button>
          <Button onClick={handleAllow}>Allow</Button>
        </div>
      </div>
    </Dialog>
  )
}

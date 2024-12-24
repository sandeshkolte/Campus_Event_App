import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { baseUrl } from "@/common/common"
import axios from "axios"
import { toast } from "react-toastify"

export function ShowWinnersSwitch({event}) {
  const [isOn, setIsOn] = useState(true)

  const callApi = async (state) => {
    try {
      const response = await axios.post(`${baseUrl}/api/winners/toggle/${event._id}`, {
        showWinners: state,
      }).then((response) => {
        // toast.success("Winners visibility Changed !")
      })
    //   const data = await response.json()
    //   console.log('API response:', response.data.message)

    } catch (error) {
      console.error('Error calling API:', error)
    }
  }

  useEffect(() => {
    callApi(isOn)
  }, [isOn])

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="show-winner"
        checked={isOn}
        onCheckedChange={setIsOn}
      />
      <Label htmlFor="show-winner">Show Winners</Label>
    </div>
  )
}


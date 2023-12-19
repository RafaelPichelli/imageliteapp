import {toast} from 'react-toastify'

export const useNotification = () => {

    function notify(message: string, level: "success" | "info" | "warning" | "error" | "default"){
        toast(message, {
            type: level
        })
    }

    return { notify }
}
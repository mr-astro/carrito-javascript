const App = document.getElementById("App")

const baseUrl = 'http://www.omdbapi.com/'
const title = "pikachu"

const catchTitle = async (title) => {
    try {
        let response = await fetch(`${baseUrl}/?t=${title}&apikey=f105dfc8`)
        let data = await response.json()
        console.log(data)
        return data

    } catch (error) {
        console.error('ALGO SALIO MAL', error)
    }
}

catchTitle(title)

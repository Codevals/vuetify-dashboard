import { AdFormat } from "@/enums/format.enums";

export default function groupByAppAndCountry(data: any){
    const result = []
    const map = new Map()

    for(const entry of data){
        const app = entry.app
        const os = entry.os
        const country = entry.country
        const revenue = parseFloat(entry.revenue)
        const format = entry.format

        //Pour une première fois on crée un map avec comme clé app os
        if(!map.has(`${app} ${os}`)){
            map.set(`${app} ${os}`,{
                data: entry,
                [`totalRevenue${country}`]: revenue, // on recupère le premier revenue s'il y en a
                ['views']: 0,
                ['conversions']: 0,
                ['platform']: 0,
                ['rewarded']: 0,
                ['fullscreen']: 0,
                ['video']: 0,
                ['banner']: 0
            })
        }else{ //Ici le map existe deja
            const appData = map.get(`${app} ${os}`) // on recupére le map
            //On calcule le nouveau revenue total pour ce pays
            appData[`totalRevenue${country}`] = (appData[`totalRevenue${country}`] || 0) + revenue
            appData[`totalRevenue`] = (appData[`totalRevenue`] || 0) + revenue
            appData[`totalViews`] = (appData[`totalViews`] || 0) + entry.views
            appData[`totalConversions`] = (appData[`totalConversions`] || 0) + entry.conversions
            appData[`totalPlatform`] = os == "Andoid" ? 'android' : 'ios'
            //Le format est soit REWARDED, VIDEO, FULLSCREEN ou BANNER
            //Si pour l'entrée courante le format est REWARDED on ajoute le revenu sinon on ajoute 0
            appData[`rewarded`] = (appData[`rewarded`] || 0) + (format == AdFormat.REWARDED ? revenue : 0)
            appData[`video`] = (appData[`video`] || 0) + (format == AdFormat.VIDEO ? revenue : 0)
            appData[`banner`] = (appData[`banner`] || 0) + (format == AdFormat.BANNER ? revenue : 0)
            appData[`fullscreen`] = (appData[`fullscreen`] || 0) + (format == AdFormat.FULLSCREEN ? revenue : 0)
        }
    }
    //On pousse enfin de le tabelau result la le nom de l'app comme clé et les autres champ comme valeur
    for(const [key, value] of map){
        result.push({
            app: key, ...value
        })
    }

    return result
}
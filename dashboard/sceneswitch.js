const obs = new OBSWebSocket()
const scenelist = document.getElementById('scenes')
function make_btn(l,active) {
    btn = document.createElement('input')
    console.log('label is',l)
    btn.setAttribute('type','radio')
    btn.setAttribute('class','btn-check')
    btn.setAttribute('id',l)
    btn.setAttribute('name','scenes')
    btn.setAttribute('autocomplete', 'off')
    btn.setAttribute('onclick',`switch_scene(${l})`)
    if (active) btn.setAttribute('checked','true')
    lbl = document.createElement('label')
    lbl.setAttribute('class','btn btn-outline-primary')
    lbl.setAttribute('for',l)
    lbl.innerHTML=l
    scenelist.appendChild(btn)
    scenelist.appendChild(lbl)
}
function populate_list(host='127.0.0.1', pass=null)
{
    obs.connect(`ws://${host}:4455`, pass).then( ()=>{
        console.log(`connected to ws://${host}:4455`)
        obs.call('GetSceneList').then( res => {
            console.log(res.currentProgramSceneName)
            console.log(res.scenes)
            for (scene of res.scenes)
            {
                console.log(scene.sceneName, res.currentProgramSceneName,scene.sceneName==res.currentProgramSceneName)
                make_btn(scene.sceneName, scene.sceneName==res.currentProgramSceneName)
            }
        })
    })
}

function switch_scene(l)
{
    console.log(l.id)
    console.log({'sceneName':l.id})
    obs.call('SetCurrentProgramScene',{'sceneName':l.id})
}
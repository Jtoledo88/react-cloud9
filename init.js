({name:"c9-plugin",version:"0.1",remote:"https://github.com/breatheco-de/c9-plugin.git",absPath:"/home/ubuntu/c9-plugin",relativePath:"~/c9-plugin",debug:!1,log:function(e){this.debug&&console.log(e)},init:function(){this.log("initializing..."),plugin.breathecode=this,services.proc.execFile("test",{args:["-d",plugin.breathecode.absPath],cwd:"/"},e=>{e&&1==e.code?services.proc.execFile("git",{args:["clone",plugin.breathecode.remote,plugin.breathecode.absPath],cwd:"/"},e=>{e?console.error(e):this.startLifeCycle()}):e?console.error(e):this.startLifeCycle()})},startLifeCycle:function(){this.runScript("get_utils",e=>{plugin.breathecode=Object.assign(plugin.breathecode,e),this.runScript("get_scripts",e=>this.runScripts(e.beforeMount,()=>this.runScript("sync_scripts",()=>this.runScripts(e.afterMount,()=>this.log("All scripts done")),!0)))},!0)},runScripts:function(e,r=null){let t={};e.forEach((e,i)=>{t[e]={loading:!0,error:!1},this.runScript(e,i=>{"Error"==typeof i&&(t[e].error=!0),t[e].loading=!1,r&&!(e=>{for(let r in e)if(e[r].loading)return!0;return!1})()&&r()})})},runScript:function(e,r=null,t=!1){this.log("Retrieving script: "+e),!r&&this.debug&&console.error("runscript needs a function callback"),services.fs.readFile(this.relativePath+"/scripts/"+e+".js",(e,i)=>{e?(this.debug&&console.error(e),t||r(new Error(e))):new Function(i)()(services,plugin).then(e=>r(e)).catch(e=>{plugin.breathecode.notify().error(e),t||r(new Error(e))})})}}).init();
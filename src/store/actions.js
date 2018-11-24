export default{
    docollapse({commit},collapse){
        commit('DOCOLLAPSE',collapse)
    },
    options({commit},tabs){
        commit('OPTIONS',tabs)
    },
    user({commit},user){
        commit('USER',user)
    },

    searchym({commit},searchym){
        commit('SEARCHYM',searchym)
    },
    
    refresh({commit},refresh){
        commit('REFRESH',refresh)
    },

    

}
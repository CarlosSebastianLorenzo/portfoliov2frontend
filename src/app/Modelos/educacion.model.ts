export interface Educacion {
    "id" : number,
    "institucion" : string,
    "logo" : string,
    "titulo" : string,
    "fechaInicial" : Date,
    "fechaFinal" : Date,
    "usuario" : { "id" : number }
}
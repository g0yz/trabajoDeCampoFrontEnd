# Configuración del Proyecto

## Tener instalado:
- _PostgreSQL:_
_Cuando se instala postgresql instalar pgAdmin4_
```
https://www.postgresql.org/
```

- _Postman_
```
https://www.postman.com/
```
- _(Recomendado) IntelliJ IDEA_
```
https://www.jetbrains.com/idea/
```

- _Maven_
```
https://www.youtube.com/watch?v=rl5-yyrmp-0 
```
- _Java_

## Java / JDK
- **Versión:** 17.0.12 LTS  
- **Fecha de lanzamiento:** 2024-07-16
_Link de la version:_
```
https://download.oracle.com/java/17/archive/jdk-17.0.12_windows-x64_bin.exe
```
## Spring Boot
- **Puerto de la aplicación:** [http://localhost:8081]

## Frontend
- **Puerto de la aplicación:** [http://localhost:3000]

## Base de datos PostgreSQL
- **Nombre de la DB:** grupo7_db  
- **Contraseña:** 8080  

- **Puerto de la aplicación:** [http://localhost:5432]

## Instalacion de dependencias 
_En el frontEnd ejecutar en la terminal:_
### `npm install`

_Solucion error react scripts is not recognized as an internal or external command_
- Eliminar la linea `"react-scripts": "0.0.0"` en package.json 
- Luego ejecutar `npm install react-scripts --save`
- Finalmente verificar que aparezca `"react-scripts": "5.0.1"`

## Dependencias pom

    <dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>org.postgresql</groupId>
			<artifactId>postgresql</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>


## plugins pom

			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>

## Postman 
_(Hay que tener la base de datos corriendo)_

### Registrar Usuario 
`POST` http://localhost:8081/auth/register

- _En `Body` seleccionar raw y JSON_
	_Ingresar en raw:_
	{
  		"email": "mail@gmail.com",
  		"password": "contraseña"
	}

### Logear Usuario
`POST` http://localhost:8081/auth/login

- _En `Body` seleccionar raw y JSON_
	_Ingresar en raw:_
	{
  		"email": "mail@gmail.com",
  		"password": "contraseña"
	}
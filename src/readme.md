# JBL Concept Real Estate

## Project 
Real Estate Web Site
>React TS

>Backend API for data

## Developers
Ajsa Soft

>Aleksandar Jovanovac

>Teodora Jovanovac

## Time table of project
|Date|Description|
|-|-|
|09.10.2024|Start of project| 

## Installation
React Vite TypeScript
```bash
npm create vite@latest
```

React Router Dom
```bash
npm i react-router-dom
```

svg? REACT vite ts svg.... ne secam se

React Helmet (SEO)
```bash
npm i react-helmet-async
```
React Google Tag Manager Module
```bash
npm i react-gtm-module
```
Fix for TypeScript
```bash
npm i --save-dev @types/react-gtm-module
```

React Google Analytics 4
```bash
npm i react-ga4
```

## IIS hosting * Fix to transfer error to React Error Routing
change web.config in 
```bash
<configuration/system.webServer>
    <rewrite>
      <rules>
        <!-- Redirect all routes to index.html -->
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
```

## Live server
[www.jblconcept.rs](https://www.jblconcept.rs)
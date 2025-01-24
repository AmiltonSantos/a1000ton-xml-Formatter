function formatXML() {
    const input = document.getElementById("xmlInput").value.trim();
    const errorMessageElement = document.getElementById("errorMessage");

    // Limpar mensagem de erro
    errorMessageElement.textContent = '';

    try {
        // Analise texto XML diretamente
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(input, "application/xml");

        // Determine se é XML válido
        const parseError = xmlDoc.getElementsByTagName("parsererror");
        if (parseError.length > 0) {
            throw new Error("Formato XML inválido");
        }

        // Formate XML e sobreponha na caixa de texto
        const formattedXml = formatXml(xmlDoc);
        document.getElementById("xmlInput").value = formattedXml;

    } catch (e) {
        // Se a formatação falhar, uma mensagem de erro será exibida
        errorMessageElement.textContent = "Não é possível formatar para XML válido: " + e.message;
    }
}

function formatXml(xml) {
    const serializer = new XMLSerializer();
    let xmlString = serializer.serializeToString(xml);

    // Remova espaços e novas linhas desnecessários
    xmlString = xmlString.replace(/>\s+</g, '><');  // Remova espaços e quebras de linha entre tags

    let formattedXml = '';
    let indent = 0;
    const lines = xmlString.split(/(?=<)|(?<=\/>)/);  // Dividir string por tag

    // Iterar em cada linha para recuar
    for (let line of lines) {
        let trimmedLine = line.trim();

        // Ignorar linhas vazias
        if (!trimmedLine) continue;

        // Fechar tags, reduzir recuo
        if (trimmedLine.startsWith('</')) {
            indent--;
        }

        // Adicionar recuo e quebras de linha
        formattedXml += '  '.repeat(indent) + trimmedLine + '\n';

        // Abra tags e aumente o recuo
        if (trimmedLine.startsWith('<') && !trimmedLine.endsWith('/>') && !trimmedLine.startsWith('</')) {
            indent++;
        }
    }

    return formattedXml.trim();
}


function compressXML() {
    const input = document.getElementById("xmlInput").value.trim();
    const errorMessageElement = document.getElementById("errorMessage");

    // Limpar mensagem de erro
    errorMessageElement.textContent = '';

    try {
        // Analise texto XML diretamente
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(input, "application/xml");

        // Determine se é XML válido
        const parseError = xmlDoc.getElementsByTagName("parsererror");
        if (parseError.length > 0) {
            throw new Error("Formato XML inválido");
        }

        // Compactar XML e sobrepor em caixa de texto
        const compressedXml = compressXml(xmlDoc);
        document.getElementById("xmlInput").value = compressedXml;

    } catch (e) {
        // Se a compactação falhar, uma mensagem de erro será exibida
        errorMessageElement.textContent = "Não é possível compactar em XML válido: " + e.message;
    }
}

function compressXml(xml) {
    const serializer = new XMLSerializer();
    let xmlString = serializer.serializeToString(xml);

    // Remova espaços extras e novas linhas e converta para formato compacto
    xmlString = xmlString.replace(/>\s+</g, '><');  // Remova espaços e quebras de linha entre tags
    xmlString = xmlString.replace(/(\r\n|\n|\r)/gm, ''); // Remover todas as novas linhas

    return xmlString;
}

function copyText() {
    const textArea = document.getElementById("xmlInput");
    textArea.select();
    document.execCommand('copy');
}

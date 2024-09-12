const fileList = document.querySelector('.file-list');
const fileBrowseButton = document.querySelector('.file-browser-button');
const fileBrowseInput = document.querySelector('.file-browser-input');
const fileUploadBox = document.querySelector('.file-upload-box');
const fileComplatedStatus = document.querySelector('.file-competed-status');


let totalFiles = 0;
let completedFiles = 0;

// Fayl elementini yaratish funksiyasi
const createFileItemHTML = (file, uniqueIdentfier) => {
    const {name, size} = file;
    const extension = name.split(".").pop();
    // Generating HTML for file item 
    return `<li class="file-item" id="file-item-${uniqueIdentfier}">
                <div class="file-extension">${extension}</div>
                <div class="file-content-wrapper">

                    <div class="file-content">
                        <div class="file-details">
                            <h5 class="file-name">${name}</h5>
                            <div class="file-info">
                                <small class="file-size">4 MB / ${size}</small>
                                <small class="file-divider">*</small>
                                <small class="file-status">Uploading...</small>
                            </div>
                        </div>
                        <button class="cancel-button">
                            <i class="bx bx-x"></i>
                        </button>
                    </div>
                    <div class="file-progress-bar">
                        <div class="file-progress"></div>
                    </div>
                </div>
            </li>`;
}
const fileSizeMB = (size) => (size / (1024 * 1024)).toFixed(2) + ' MB';

const handleFileUploading = (file, uniqueIdentfier) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.upload.addEventListener('progress', (e) => {
        const fileProgress = document.querySelector(`#file-item-${uniqueIdentfier} .file-progress`);
        const fileSize = document.querySelector(`#file-item-${uniqueIdentfier} .file-size`);
        const formattedFileSize = file.size >= 1024 * 1024 
        ? `${(e.loaded / (1024 * 1024)).toFixed(2)} MB / ${(e.total / (1024 * 1024)).toFixed(2)} MB` 
        : `${(e.loaded / 1024).toFixed(2)} KB / ${(e.total / 1024).toFixed(2)} KB`;
    
        const progress = Math.round((e.loaded / e.total) * 100);
        fileProgress.style.width = `${progress}%`;
        fileSize.innerText = formattedFileSize;
    });

    // opening connections
    xhr.open("POST", "api.php", true);
    xhr.send(formData);
    
    return xhr;
}

// Fayllarni tanlashni boshqarish funksiyasi
const handleSelectedFiles = (files) => {
    if(files.length === 0) return;  // Fayllar bo'lmasa, qaytib chiqish
    totalFiles += files.length;

    Array.from(files).forEach((file, index) => {
        const uniqueIdentfier = Date.now() + index;
        const fileItemHTML = createFileItemHTML(file, uniqueIdentfier);
        fileList.insertAdjacentHTML("afterbegin", fileItemHTML);
        const currentFileItem = document.querySelector(`#file-item-${uniqueIdentfier}`);
        const cancelFileUploadButton = currentFileItem.querySelector(".cancel-button");

        const xhr = handleFileUploading(file, uniqueIdentfier);
        xhr.upload.addEventListener('load', () => {
            completedFiles++;
            cancelFileUploadButton.remove();
            currentFileItem.querySelector('.file-status').innerText = "Completed";
            currentFileItem.querySelector('.file-status').style.color = "#00B125";
            fileComplatedStatus.innerHTML = `${completedFiles} / ${totalFiles} files complated`;
        });
     
        // Handling
        cancelFileUploadButton.addEventListener('click', () => {
            xhr.abort();
            currentFileItem.querySelector('.file-status').innerText = "Cancelled";
            currentFileItem.querySelector('.file-status').style.color = "#E3413F";
            cancelFileUploadButton.remove();
        });

        xhr.addEventListener("error", () => {
            alert("An error occured during the file upload!")
        })
    });

}

// Fayllarni tortib tashlash hodisasini boshqarish
fileUploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    handleSelectedFiles(e.dataTransfer.files);
    fileUploadBox.classList.remove('active');
    fileUploadBox.querySelector(".file-instruction").innerText = "Drag Files here or";
});

// Fayllarni tortib kirganda (dragover) hodisasi
fileUploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadBox.classList.add('active');
    fileUploadBox.querySelector(".file-instruction").innerText = "Release to upload or";
});

// Fayllarni tortib chiqishda (dragleave) hodisasi
fileUploadBox.addEventListener('dragleave', (e) => {
    e.preventDefault();
    fileUploadBox.classList.remove('active');
    fileUploadBox.querySelector(".file-instruction").innerText = "Drag Files here or";
});

// Fayl tanlash tugmasi orqali faylni tanlash hodisasi
fileBrowseInput.addEventListener('change', (e) => handleSelectedFiles(e.target.files));
fileBrowseButton.addEventListener('click', () => fileBrowseInput.click());

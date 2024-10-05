document.addEventListener('DOMContentLoaded', function() {
    const mediaUpload = document.getElementById('mediaUpload');
    const mediaContainer = document.getElementById('mediaContainer');

    // Load media from localStorage
    loadMedia();

    mediaUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const mediaElement = createMediaElement(e.target.result, file.type, file.name);
                mediaContainer.insertBefore(mediaElement, mediaContainer.firstChild); // Adiciona o mais novo no topo
                saveMedia(e.target.result, file.type, file.name);
            }
            reader.readAsDataURL(file);
        }
    });

    function createMediaElement(src, type, name) {
        const wrapper = document.createElement('div');
        wrapper.className = 'media-wrapper';

        let media;
        if (type.startsWith('image')) {
            media = document.createElement('img');
            media.src = src;
            media.onclick = function() {
                showModal(media.src);
            };
        } else if (type.startsWith('video')) {
            media = document.createElement('video');
            media.src = src;
            media.controls = true;
        }
        wrapper.appendChild(media);

        const closeButton = document.createElement('button');
        closeButton.className = 'close';
        closeButton.innerHTML = '&times;';
        closeButton.onclick = function() {
            wrapper.remove();
            deleteMedia(src);
        };
        wrapper.appendChild(closeButton);

        const downloadButton = document.createElement('a');
        downloadButton.className = 'download-button';
        downloadButton.href = src;
        downloadButton.download = name;
        downloadButton.textContent = 'Download';
        wrapper.appendChild(downloadButton);

        return wrapper;
    }

    function saveMedia(src, type, name) {
        let mediaList = JSON.parse(localStorage.getItem('mediaList')) || [];
        mediaList.unshift({ src, type, name }); // Adiciona o mais novo no início
        localStorage.setItem('mediaList', JSON.stringify(mediaList));
    }

    function loadMedia() {
        const mediaList = JSON.parse(localStorage.getItem('mediaList')) || [];
        mediaList.forEach(({ src, type, name }) => {
            const mediaElement = createMediaElement(src, type, name);
            mediaContainer.appendChild(mediaElement);
        });
    }

    function deleteMedia(src) {
        let mediaList = JSON.parse(localStorage.getItem('mediaList')) || [];
        mediaList = mediaList.filter(media => media.src !== src);
        localStorage.setItem('mediaList', JSON.stringify(mediaList));
    }

    // Modal
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');

    function showModal(src) {
        modal.style.display = 'block';
        modalImg.src = src;
    }

    modalClose.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

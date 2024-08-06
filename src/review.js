document.addEventListener('DOMContentLoaded', () => { 
    // URL 검색 매개변수 가져오기
    const URLSearch = new URLSearchParams(window.location.search);
    const id = URLSearch.get("id");

    // HTML 요소 변수로 가져오기
    const nameInput = document.getElementById("nameInput");
    const commentInput = document.getElementById("commentInput");
    const passwordInput = document.getElementById("passwordInput");
    const submitButton = document.getElementById("submitComment");
    const reviewList = document.getElementById("reviewList");

    // 날짜를 출력하기
    const creationDate = (date) => date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }).replace(/\.$/, '');

    // 로컬 스토리지에서 데이터 가져오기
    const getComments = () => {
        const comments = localStorage.getItem(`comments_${id}`);
        return comments ? JSON.parse(comments) : [];
    };

    // 로컬 스토리지에 데이터 저장하기
    const setComments = (comments) => {
        localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
    };

    // 댓글을 추가하기 및 유호성 검사
    const addComment = () => {
        const newName = nameInput.value.trim();
        const newComment = commentInput.value.trim();
        const newPassword = passwordInput.value.trim();

        if (newName.length < 1){
            alert("이름을 1자 이상 입력해주세요!");
            return;
        }
        if(newComment.length < 2){
            alert("내용을 3자 이상 입력해주세요!");
            return;
        }
        if(newPassword.length < 2) {
            alert("비밀번호를 3자 이상를 입력해주세요!");
            return;
        }

        const comments = getComments();
        comments.push({ name: newName, comment: newComment, password: newPassword, createdAt: creationDate(new Date()) });
        setComments(comments);
        nameInput.value = "";
        commentInput.value = "";
        passwordInput.value = "";
        displayList();
    };

    // 비밀번호 확인 후 댓글 수정/삭제 함수
    const handleCommentAction = (index, actionType, newComment) => {
        const comments = getComments();
        const password = document.querySelector(`#password_${index}`).value.trim();

        if (password === comments[index].password) {
            if (actionType === 'edit') {
                comments[index].comment = newComment;
                comments[index].updatedAt = creationDate(new Date());
            } else if (actionType === 'delete') {
                comments.splice(index, 1);
            }
            setComments(comments);
            displayList();
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    };

    // 댓글 수정 모드
    const enableEdit = (index) => {
        const comments = getComments();
        const commentDiv = document.querySelector(`#comment_${index}`);
        commentDiv.innerHTML = `
        <div class="comment-edit">
            <textarea id="editComment_${index}">${comments[index].comment}</textarea>
            <input type="password" id="password_${index}" placeholder="비밀번호">
            <div class="comment-edit-buttons">
                <button onclick="saveEdit(${index})">저장</button>
                <button onclick="displayList()">취소</button>
            </div>    
        </div>
        `;
    };

    // 수정한 댓글 저장
    const saveEdit = (index) => {
        const updatedComment = document.querySelector(`#editComment_${index}`).value.trim();
        handleCommentAction(index, 'edit', updatedComment);
    };

    // 댓글 삭제 모드
    const enableDelete = (index) => {
        const commentDiv = document.querySelector(`#comment_${index}`);
        commentDiv.innerHTML = `
        <div class="comment-delete">
            <input type="password" id="password_${index}" placeholder="비밀번호">
            <div class="comment-delete-buttons">
                <button class="delete-butten" onclick="confirmDelete(${index})">삭제</button>
                <button class="cancel-butten" onclick="displayList()">취소</button>
            </dev>
        </div>
        `;
    };

    // 댓글을 삭제하는 함수
    const confirmDelete = (index) => {
        handleCommentAction(index, 'delete');
    };

    // 댓글 목록을 화면에 출력하는 함수
    const displayList = () => {
        const comments = getComments();
        reviewList.innerHTML = '';

        comments.forEach((comment, index) => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.id = `comment_${index}`;
            commentDiv.innerHTML = `
                <strong>${comment.name}</strong><br>
                 ${comment.comment}
                <div class="comment-info">
                    ${comment.createdAt}
                </div>
                <div class="comment-buttons">
                    <button onclick="enableEdit(${index})">수정</button>
                    <button onclick="enableDelete(${index})">삭제</button>
                </div>
            `;
            reviewList.appendChild(commentDiv);
        });
    };

    // 클릭으로 댓글 추가
    submitButton.addEventListener('click', addComment);

    // 함수들을 전역으로 설정
    window.saveEdit = saveEdit;
    window.enableEdit = enableEdit;
    window.enableDelete = enableDelete;
    window.confirmDelete = confirmDelete;
    window.displayList = displayList;

    // 페이지 새로고침시 댓글 목록 보이기
    displayList();
});


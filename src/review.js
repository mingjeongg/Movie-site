
document.addEventListener('DOMContentLoaded', () => {

    // HTML 요소 변수로 가져오기
    const commentInput = document.getElementById("commentInput");
    const passwordInput = document.getElementById("passwordInput");
    const submitButton = document.getElementById("submitComment");
    const reviewList = document.getElementById("reviewList");


    // 로컬 스토리지에서 리뷰 데이터 가져오는 함수
    function getComments(){
        const comments = localStorage.getItem('comments');
        return comments ? JSON.parse(comments) : [];
    }

    //리뷰 추가 함수 - 내용, 비밀번호의 조건 확인
    function addComment(){
        const newComment = commentInput.value.trim();
        const newPassword = passwordInput.value.trim();

        if(newComment.length < 2){
            alert("내용을 3자 이상 입력해주세요!");
            return;
        }
        if(newPassword.length < 2){
            alert("비밀번호를 3자 이상 입력해주세요!");
            return;
        }
        const comments = getComments();
        comments.push({text: newComment, password: newPassword});
        localStorage.setItem('comments', JSON.stringify(comments));
        commentInput.value = "";
        passwordInput.value = "";
        displayList()
    }

    // 입력받은 comment 화면에 출력하는 함수
    function displayList(){
        const comments = getComments();
        reviewList.innerHTML = '';

        comments.forEach((comment, index) => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML = `${comment.text}
            <div class="comment-btn">
                <button onclick="editComment(${index})">수정</button>
                <button onclick="deleteComment(${index})">삭제</button>
            </div>`;
        reviewList.appendChild(commentDiv);
        })
    }

    //클릭으로 댓글 추가
    submitButton.addEventListener('click', addComment);
    
    //리뷰 목록 보이기
    displayList();


});

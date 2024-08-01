
document.addEventListener('DOMContentLoaded', () => {

    // HTML 요소 변수로 가져오기.
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

        if(newComment.length < 4){
            alert("내용을 5자 이상 입력해주세요!");
            return;
        }
        if(newPassword.length < 4){
            alert("비밀번호를 5자 이상 입력해주세요!");
            return;
        }
        const comments = getComments();
        comments.push({text: newComment, password: newPassword});
        localStorage.setItem('comments', JSON.stringify(comments));
        commentInput.value = "";
        passwordInput.value = "";
    }

    //입력 받으면 클릭으로 댓글 추가
    submitButton.addEventListener('click', addComment);
})

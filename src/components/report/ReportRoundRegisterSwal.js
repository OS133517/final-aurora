import Swal from 'sweetalert2';

const handleAddCycle = async () => {

  const { value: formValues } = await Swal.fire({

    title: '보고 회차 추가',
    html:
      '<input id="roundTitle" class="swal2-input" placeholder="보고 회차 제목">' +
      '<input id="roundBody" class="swal2-input" placeholder="보고 회차 내용">',
    focusConfirm: false,
    preConfirm: () => {

      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value,
      ];
    },
    showCancelButton: true,
    confirmButtonText: '추가',
    cancelButtonText: '취소',
  });
};

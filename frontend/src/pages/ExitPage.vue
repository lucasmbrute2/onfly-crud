<script  lang="ts" setup>

import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
const $q = useQuasar()

const router = useRouter()
localStorage.setItem('token', '')
$q.notify({
  message: 'Até a próxima!'
})
router.push('/login')
</script>

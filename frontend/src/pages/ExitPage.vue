<script  lang="ts" setup>

import { useRouter } from 'vue-router';

const router = useRouter()
localStorage.setItem('token', '')
router.push('/login')
</script>

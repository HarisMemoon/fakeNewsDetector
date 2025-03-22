import { useMutation } from '@tanstack/react-query';
import api from '../services/api';

function useNewsCheck() {
  return useMutation({
    mutationFn: (newsText) =>
      api.post('/check-news', { news_text: newsText }).then(res => res.data),
  });
}

export default useNewsCheck;

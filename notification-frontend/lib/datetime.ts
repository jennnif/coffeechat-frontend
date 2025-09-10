/**
 * Java LocalDateTime 형식으로 변환하는 유틸리티 함수들
 */

/**
 * Date 객체를 Java LocalDateTime 형식("YYYY-MM-DDTHH:mm:ss")으로 변환
 * @param date 변환할 Date 객체
 * @returns "YYYY-MM-DDTHH:mm:ss" 형식의 문자열
 */
export function toLocalDateTimeStringForJava(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

/**
 * 현재 시간을 datetime-local input에 바로 넣을 수 있는 형식으로 반환
 * @returns "YYYY-MM-DDTHH:mm" 형식의 문자열
 */
export function nowLocalForInput(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

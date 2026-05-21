export function formatDate(date, locale = 'id-ID') {
    if (!date) return '-';
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatCurrency(amount, currency = 'IDR') {
    if (amount == null) return '-';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency }).format(amount);
}

export function formatNumber(number) {
    if (number == null) return '-';
    return new Intl.NumberFormat('id-ID').format(number);
}
